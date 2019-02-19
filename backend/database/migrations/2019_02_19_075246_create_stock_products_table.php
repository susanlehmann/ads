<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_product');
            $table->integer('id_client_stock');
            $table->integer('id_create')->nullable();
            $table->integer('id_update')->nullable();
            $table->integer('id_update')->nullable();
            $table->integer('stock_qty')->nullable();
            $table->decimal('stock_price',18,2)->nullable();
            $table->integer('save_price')->nullable();
            $table->integer('reason_stock')->nullable();
            $table->text('discription_stock')->nullable();
            $table->integer('status_stock')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_products');
    }
}
