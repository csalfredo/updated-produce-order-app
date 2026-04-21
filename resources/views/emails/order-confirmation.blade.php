<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Confirmation</title>
    <style type="text/css">
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #ffffff;
        }
        .header {
            background-color: #4299e1;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            margin-bottom: 20px;
        }
        .header h2 {
            color: white;
            margin: 0;
        }
        .header p {
            color: white;
            margin: 5px 0 0 0;
        }
        .order-info {
            background-color: #f7fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        h1, h2, h3 { color: #2c3e50; }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th { 
            background-color: #4299e1; 
            color: white;
            padding: 12px; 
            text-align: left; 
        }
        td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #ddd; 
        }
        tr:nth-child(even) { background-color: #f7fafc; }
        tfoot tr {
            background-color: #f2f2f2;
        }
        .total { font-weight: bold; text-align: right; margin: 20px 0; font-size: 18px; }
        .button { display: inline-block; background-color: #3490dc; color: white; padding: 10px 15px; 
                 text-decoration: none; border-radius: 4px; }
        .footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; 
                 font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Order Confirmation</h2>
            <p>Thank you for your order!</p>
        </div>
        
        <p><strong>Order ID:</strong> {{ $order->id }}</p>
        <p><strong>Order Date:</strong> {{ $order->created_at->format('Y-m-d H:i') }}</p>
        
        <h3>Order Items:</h3>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                @if(isset($orderItems) && $orderItems->count() > 0)
                    @foreach($orderItems as $item)
                        <tr>
                            <td>{{ $item->name }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>${{ number_format($item->promo_price ?: $item->price, 2) }}</td>
                            <td>${{ number_format(($item->quantity * ($item->promo_price ?: $item->price)), 2) }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td colspan="4">No items in this order.</td>
                    </tr>
                @endif
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total Items:</td>
                    <td>{{ $orderItems->sum('quantity') }}</td>
                </tr>
                <tr class="total">
                    <td colspan="3">Total Amount:</td>
                    <td>${{ number_format($order->total ?? 0, 2) }}</td>
                </tr>
            </tfoot>
        </table>
        
        <p style="text-align: center;">
            <a href="{{ url('/orders/' . $order->id) }}" class="button">View Order Details</a>
        </p>
        
        <div class="footer">
            <p>Thank you for shopping with {{ config('app.name', 'Our Store') }}!</p>
            <p>© {{ date('Y') }} {{ config('app.name', 'Our Store') }}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>