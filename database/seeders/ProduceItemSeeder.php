<?php

namespace Database\Seeders;

use App\Models\ProduceItem;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProduceItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find admin user or the first user in the system
        $user = User::first();
        
        if (!$user) {
            $this->command->error('No users found. Please create a user first.');
            return;
        }
        
        // Clear existing data to avoid duplicates
        ProduceItem::truncate();
        
        // Define produce items from your JS array
        $produceItems = [
            // Apples
            [
                'name' => 'apple gala',
                'product_code' => '110',
                'inventory' => '40',
                'case_cost' => 27.41,
                'case_size' => '40 lbs',
                'promo_price' => 17.49,
                'stock' => true,
                'produce_image' => 'gala_apple.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'apple fuji',
                'product_code' => '108',
                'inventory' => '20',
                'case_cost' => 27.41,
                'case_size' => '40 lbs',
                'promo_price' => 0,
                'stock' => true,
                'produce_image' => 'fuji_apple.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'apple honeycrisp',
                'product_code' => '111',
                'inventory' => '80',
                'case_cost' => 27.41,
                'case_size' => '40 lbs',
                'promo_price' => 12.49,
                'stock' => true,
                'produce_image' => 'honey_crisp.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'apple granny smith',
                'product_code' => '114',
                'inventory' => '10',
                'case_cost' => 49.50,
                'case_size' => '40 lbs',
                'promo_price' => 0,
                'stock' => false,
                'produce_image' => 'granny_smith.jpg',
                'quantity' => 1
            ],
            
            // Citrus
            [
                'name' => 'oranges navel',
                'product_code' => '120',
                'inventory' => '90',
                'case_cost' => 28.99,
                'case_size' => '40 lbs',
                'promo_price' => 0.79,
                'stock' => true,
                'produce_image' => 'oranges_navel.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'lemons',
                'product_code' => '122',
                'inventory' => '50',
                'case_cost' => 36.99,
                'case_size' => '75 ct',
                'promo_price' => 0.59,
                'stock' => true,
                'produce_image' => 'lemons.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'limes',
                'product_code' => '124',
                'inventory' => '45',
                'case_cost' => 34.99,
                'case_size' => '75 ct',
                'promo_price' => 0.49,
                'stock' => true,
                'produce_image' => 'limes.jpg',
                'quantity' => 1
            ],
            
            // Berries
            [
                'name' => 'strawberries',
                'product_code' => '130',
                'inventory' => '40',
                'case_cost' => 22.99,
                'case_size' => '8 lb',
                'promo_price' => 3.99,
                'stock' => true,
                'produce_image' => 'strawberries.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'blueberries',
                'product_code' => '132',
                'inventory' => '30',
                'case_cost' => 24.99,
                'case_size' => '12 ct',
                'promo_price' => 2.99,
                'stock' => true,
                'produce_image' => 'blueberries.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'raspberries',
                'product_code' => '134',
                'inventory' => '25',
                'case_cost' => 28.99,
                'case_size' => '12 ct',
                'promo_price' => 3.49,
                'stock' => true,
                'produce_image' => 'raspberries.jpg',
                'quantity' => 1
            ],
            
            // Fruits
            [
                'name' => 'bananas',
                'product_code' => '140',
                'inventory' => '120',
                'case_cost' => 19.99,
                'case_size' => '40 lbs',
                'promo_price' => 0.59,
                'stock' => true,
                'produce_image' => 'bananas.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'green grapes',
                'product_code' => '142',
                'inventory' => '40',
                'case_cost' => 32.99,
                'case_size' => '18 lb',
                'promo_price' => 2.49,
                'stock' => true,
                'produce_image' => 'green_grapes.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'red grapes',
                'product_code' => '144',
                'inventory' => '40',
                'case_cost' => 34.99,
                'case_size' => '18 lb',
                'promo_price' => 2.69,
                'stock' => true,
                'produce_image' => 'red_grapes.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'watermelon',
                'product_code' => '146',
                'inventory' => '30',
                'case_cost' => 45.99,
                'case_size' => '6 ct',
                'promo_price' => 5.99,
                'stock' => true,
                'produce_image' => 'watermelon.jpg',
                'quantity' => 1
            ],
            
            // Vegetables
            [
                'name' => 'tomato',
                'product_code' => '200',
                'inventory' => '80',
                'case_cost' => 24.99,
                'case_size' => '25 lbs',
                'promo_price' => 1.29,
                'stock' => true,
                'produce_image' => 'tomato.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'roma tomato',
                'product_code' => '202',
                'inventory' => '60',
                'case_cost' => 22.99,
                'case_size' => '25 lbs',
                'promo_price' => 0.99,
                'stock' => true,
                'produce_image' => 'roma.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'avocado',
                'product_code' => '210',
                'inventory' => '50',
                'case_cost' => 42.99,
                'case_size' => '48 ct',
                'promo_price' => 1.49,
                'stock' => true,
                'produce_image' => 'avocado.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'broccoli',
                'product_code' => '220',
                'inventory' => '40',
                'case_cost' => 32.99,
                'case_size' => '14 ct',
                'promo_price' => 2.49,
                'stock' => true,
                'produce_image' => 'broccoli.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'cabbage',
                'product_code' => '230',
                'inventory' => '35',
                'case_cost' => 24.99,
                'case_size' => '12 ct',
                'promo_price' => 1.99,
                'stock' => true,
                'produce_image' => 'cabbage.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'cauliflower',
                'product_code' => '232',
                'inventory' => '30',
                'case_cost' => 28.99,
                'case_size' => '12 ct',
                'promo_price' => 2.79,
                'stock' => true,
                'produce_image' => 'cauliflower.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'cilantro',
                'product_code' => '240',
                'inventory' => '40',
                'case_cost' => 18.99,
                'case_size' => '24 ct',
                'promo_price' => 0.99,
                'stock' => true,
                'produce_image' => 'cilantro.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'garlic',
                'product_code' => '250',
                'inventory' => '60',
                'case_cost' => 22.99,
                'case_size' => '30 lb',
                'promo_price' => 0.79,
                'stock' => true,
                'produce_image' => 'garlic.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'russet potato',
                'product_code' => '260',
                'inventory' => '90',
                'case_cost' => 29.99,
                'case_size' => '50 lbs',
                'promo_price' => 0.69,
                'stock' => true,
                'produce_image' => 'russet.jpg',
                'quantity' => 1
            ],
            [
                'name' => 'white onion',
                'product_code' => '348',
                'inventory' => '145',
                'case_cost' => 15.50,
                'case_size' => '50 lbs',
                'promo_price' => 0,
                'stock' => true,
                'produce_image' => 'whiteOnion.jpg',
                'quantity' => 1
            ],
        ];

        // Insert all produce items
        foreach ($produceItems as $item) {
            ProduceItem::create([
                'user_id' => $user->id,
                'name' => $item['name'],
                'product_code' => $item['product_code'],
                'inventory' => $item['inventory'],
                'case_cost' => $item['case_cost'],
                'case_size' => $item['case_size'],
                'promo_price' => $item['promo_price'],
                'stock' => $item['stock'],
                'produce_image' => $item['produce_image'],
                'quantity' => $item['quantity']
            ]);
        }
        
        $this->command->info('Produce items seeded successfully!');
    }
}
