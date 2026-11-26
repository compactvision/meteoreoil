<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuoteRequestTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_a_quote_with_optional_contact_fields_omitted(): void
    {
        $line = ['productId' => 1, 'size' => 5, 'pack' => 'bidons', 'quantity' => 2];

        $response = $this->postJson(route('quotes.store'), [
            'name' => 'Client test',
            'email' => 'client@example.test',
            'lines' => [$line],
        ])->assertCreated();

        $this->assertDatabaseHas('quote_requests', [
            'id' => $response->json('id'),
            'email' => 'client@example.test',
            'lines' => json_encode([$line], JSON_THROW_ON_ERROR),
        ]);
    }

    public function test_it_rejects_an_unavailable_adblue_size(): void
    {
        $this->postJson(route('quotes.store'), [
            'name' => 'Client test',
            'email' => 'client@example.test',
            'lines' => [
                ['productId' => 22, 'size' => 1, 'pack' => 'bidons', 'quantity' => 1],
            ],
        ])->assertUnprocessable()->assertJsonValidationErrors('lines');

        $this->assertDatabaseCount('quote_requests', 0);
    }
}
