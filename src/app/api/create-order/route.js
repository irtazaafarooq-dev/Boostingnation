import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { productName, price, userEmail, game, platform } = await req.json();

    // Generate a unique 6-digit Order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    // Prepare the message for Discord
    const discordPayload = {
      embeds: [
        {
          title: "🚨 New Order Request Created!",
          description: `A user has requested a service and is waiting in the chat room.`,
          color: 3447003, // Blue color
          fields: [
            { name: "Order ID", value: orderId, inline: true },
            { name: "Game", value: game || "Not specified", inline: true },
            { name: "Platform", value: platform || "Not specified", inline: true },
            { name: "Product", value: productName || "Custom Offer", inline: false },
            { name: "Expected Price", value: `$${price}`, inline: true },
            { name: "Customer Email", value: userEmail || "Guest", inline: true },
          ],
          timestamp: new Date().toISOString(),
        }
      ]
    };

    // Send the alert to your Discord Webhook (Make sure DISCORD_WEBHOOK_URL is in your .env file)
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordPayload)
      });
    }

    // Return the Order ID so the frontend can redirect the user
    return NextResponse.json({ success: true, orderId: orderId });

  } catch (error) {
    console.error('Order Creation Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}