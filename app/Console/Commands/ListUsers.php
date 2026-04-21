<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class ListUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:list {--format=table : Output format (table, json, csv)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all users in the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::select('id', 'name', 'email', 'email_verified_at', 'created_at')->get();
        
        if ($users->isEmpty()) {
            $this->info('No users found in the database.');
            return;
        }

        $format = $this->option('format');

        switch ($format) {
            case 'json':
                $this->line($users->toJson(JSON_PRETTY_PRINT));
                break;
            case 'csv':
                $this->outputCsv($users);
                break;
            default:
                $this->table(
                    ['ID', 'Name', 'Email', 'Verified', 'Created At'],
                    $users->map(function ($user) {
                        return [
                            $user->id,
                            $user->name,
                            $user->email,
                            $user->email_verified_at ? 'Yes' : 'No',
                            $user->created_at->format('Y-m-d H:i:s')
                        ];
                    })
                );
        }

        $this->info("Total users: " . $users->count());
    }

    private function outputCsv($users)
    {
        $headers = ['ID', 'Name', 'Email', 'Verified', 'Created At'];
        $this->line(implode(',', $headers));
        
        foreach ($users as $user) {
            $row = [
                $user->id,
                $user->name,
                $user->email,
                $user->email_verified_at ? 'Yes' : 'No',
                $user->created_at->format('Y-m-d H:i:s')
            ];
            $this->line(implode(',', $row));
        }
    }
}
