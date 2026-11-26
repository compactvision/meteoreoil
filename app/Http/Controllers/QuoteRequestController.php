<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class QuoteRequestController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $quote = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'company' => ['nullable', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:254'],
            'phone' => ['nullable', 'string', 'max:50'],
            'country' => ['nullable', 'string', 'max:100'],
            'message' => ['nullable', 'string', 'max:5000'],
            'lines' => ['required', 'array', 'list', 'max:22'],
            'lines.*' => ['required', 'array:productId,size,pack,quantity'],
            'lines.*.productId' => ['required', 'integer', 'between:1,22', 'distinct'],
            'lines.*.size' => ['required', 'integer', Rule::in([1, 5, 20, 210])],
            'lines.*.pack' => ['required', Rule::in(['bidons', 'cartons', 'futs'])],
            'lines.*.quantity' => ['required', 'integer', 'between:1,10000'],
        ]);

        foreach ($quote['lines'] as $line) {
            if ((int) $line['productId'] === 22 && (int) $line['size'] === 1) {
                throw ValidationException::withMessages(['lines' => 'AdBlue est disponible en 5, 20 et 210 L.']);
            }
        }

        $id = DB::table('quote_requests')->insertGetId(array_merge($quote, [
            'lines' => json_encode($quote['lines'], JSON_THROW_ON_ERROR),
            'created_at' => now(),
        ]));

        return response()->json(['id' => $id], 201);
    }
}
