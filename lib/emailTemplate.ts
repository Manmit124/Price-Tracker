// lib/emailTemplate.ts
export const createEmailContent = (
  currentPrice: string,
  targetPrice: string,
  productUrl: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Price Alert</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; border-top: 4px solid #3498db;">
        <h1 style="color: #3498db;">Price Drop Alert! 🎉</h1>
        <p>Great news! The price for your tracked item has dropped to your target price or below.</p>
        
        <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Current Price:</strong> <span style="color: #27ae60; font-size: 1.2em;">${currentPrice}</span></p>
            <p><strong>Your Target Price:</strong> ${targetPrice}</p>
            <p><a href="${productUrl}" style="background-color: #3498db; color: #ffffff; padding: 10px 15px; text-decoration: none; border-radius: 3px; display: inline-block;">View Product</a></p>
        </div>
        
        <p style="margin-top: 20px;">Don't miss out on this deal! Click the button above to check out the product.</p>
        
        <p style="font-size: 0.9em; color: #7f8c8d; margin-top: 30px;">If you no longer wish to receive these alerts, no action is needed as this tracker will now be removed from our system.</p>
        
        <p style="font-size: 0.9em; color: #7f8c8d;">Thank you for using our price tracking service!</p>
    </div>
</body>
</html>
`;
