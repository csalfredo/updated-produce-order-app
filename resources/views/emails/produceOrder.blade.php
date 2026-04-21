<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Produce Order</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4299e1;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            color: white;
            margin: 0;
        }
        .order-info {
            background-color: #f7fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .even-row { background-color: #f7fafc; }
        .odd-row { background-color: #ffffff; }
        .order-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .order-table th {
            background-color: #4299e1;
            color: white;
            padding: 12px;
            text-align: left;
        }
        .order-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .order-total {
            text-align: right;
            font-weight: bold;
            padding: 10px;
            font-size: 1.2em;
            color: #2c5282;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 0.9em;
            color: #718096;
            border-top: 1px solid #e2e8f0;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Produce Order</h1>
        </div>
        
        <div class="order-info">
            <p style="margin: 5px 0;"><strong>Order Date:</strong> {{ now()->format('F j, Y g:i A') }}</p>
            <p style="margin: 5px 0;"><strong>Total Items:</strong> {{ count($order['items']) }}</p>
        </div>

        <h2 style="color: #2d3748; margin-top: 20px;">Order Details:</h2>
        <table class="order-table">
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
            @foreach($order['items'] as $item)
            <tr class="{{ $loop->iteration % 2 == 0 ? 'even-row' : 'odd-row' }}">
                <td>
                    {{ ucfirst($item['name']) }}
                    @if(isset($item['case_size']))
                        <div style="color: #718096; font-size: 0.9em;">{{ $item['case_size'] }}</div>
                    @endif
                </td>
                <td>{{ $item['quantity'] }}</td>
                <td>
                    ${{ number_format($item['case_cost'], 2) }}
                    @if(isset($item['promo_price']) && $item['promo_price'] > 0)
                        <span style="color: #16a34a; font-size: 0.9em; margin-left: 8px;">(Promo: ${{ number_format($item['promo_price'], 2) }})</span>
                    @endif
                </td>
                <td>${{ number_format($item['case_cost'] * $item['quantity'], 2) }}</td>
            </tr>
            @endforeach
        </table>

        <div class="order-total">
            Total: <span style="font-size: 1.1em;">${{ number_format($total, 2) }}</span>
        </div>

        <div class="footer">
            <p>Thank you for your order! If you have any questions, please contact our support team.</p>
            <p>© {{ date('Y') }} Your Produce Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>