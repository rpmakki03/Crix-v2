import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the cards JSON file
const cardsFilePath = path.join(process.cwd(), 'src/lib/cards.json');

export async function GET(req: NextRequest) {
  try {
    const data = fs.readFileSync(cardsFilePath, 'utf-8');
    const cards = JSON.parse(data);
    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load cards.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const name = formData.get('name');
    const rarity = formData.get('rarity');
    const points = formData.get('points');
    const rating = formData.get('rating');
    const nationality = formData.get('nationality');
    const imageFile = formData.get('image');

    if (!name || !rarity || !points || !rating || !imageFile || !nationality) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Save image to public/assets/admin/
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageName = `${Date.now()}_${name}.jpg`;
    const imagePath = path.join(process.cwd(), 'public/assets/admin', imageName);
    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    fs.writeFileSync(imagePath, imageBuffer);

    // Read existing cards
    const data = fs.readFileSync(cardsFilePath, 'utf-8');
    const cards = JSON.parse(data);

    // Create new card
    const newCard = {
      id: Date.now().toString(),
      name,
      rarity,
      points: Number(points),
      rating: Number(rating),
      nationality,
      image: `/assets/admin/${imageName}`,
    };
    cards.push(newCard);
    fs.writeFileSync(cardsFilePath, JSON.stringify(cards, null, 2));

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add card.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, rarity, points, rating, nationality } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing card id' }, { status: 400 });
    }
    const data = fs.readFileSync(cardsFilePath, 'utf-8');
    const cards = JSON.parse(data);
    const cardIndex = cards.findIndex((c: any) => c.id === id);
    if (cardIndex === -1) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
    if (name !== undefined) cards[cardIndex].name = name;
    if (rarity !== undefined) cards[cardIndex].rarity = rarity;
    if (points !== undefined) cards[cardIndex].points = Number(points);
    if (rating !== undefined) cards[cardIndex].rating = Number(rating);
    if (nationality !== undefined) cards[cardIndex].nationality = nationality;
    fs.writeFileSync(cardsFilePath, JSON.stringify(cards, null, 2));
    return NextResponse.json(cards[cardIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update card.' }, { status: 500 });
  }
} 