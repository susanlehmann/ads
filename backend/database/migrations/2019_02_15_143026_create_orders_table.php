<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client_order')->nullable();
            $table->integer('id_create')->nullable();
            $table->integer('id_update')->nullable();
            $table->integer('id_staff')->nullable();
            $table->integer('id_customer')->nullable();
            $table->json('info_product')->nullable();
            $table->decimal('total_price')->nullable();
            $table->integer('status_order')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
