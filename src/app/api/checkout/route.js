import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { price, productName, userEmail } = await req.json();

    // ✅ Ensure price is a number and meets the $0.50 USD minimum
    const numericPrice = parseFloat(price);
    const finalPrice = numericPrice < 0.50 ? 0.50 : numericPrice;

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            // ✅ Lemon Squeezy expects price in CENTS ($1.00 = 100)
            custom_price: Math.round(finalPrice * 100), 
            checkout_data: {
              email: userEmail,
              custom: {
                product_name: productName,
              },
            },
            product_options: {
              name: productName,
              description: "Professional Boosting Service - Boosting Nation",
              receipt_button_text: "Start My Boost",
            },
            // ✅ Simplified checkout_options to prevent formatting errors
            checkout_options: {
              embed: true,
              button_color: "#3b82f6", // Matches your blue theme
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: String(process.env.LEMON_SQUEEZY_STORE_ID),
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: '1415806', 
              },
            },
          },
        },
      }),
    });

    const checkout = await response.json();

    // Log detailed errors if the API rejects the request
    if (!response.ok) {
      console.error("Lemon Squeezy API Error:", JSON.stringify(checkout, null, 2));
      return NextResponse.json({ 
        error: checkout.errors?.[0]?.detail || 'API Error' 
      }, { status: response.status });
    }

    // Success! Return the URL to the frontend overlay
    return NextResponse.json({ url: checkout.data.attributes.url });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}