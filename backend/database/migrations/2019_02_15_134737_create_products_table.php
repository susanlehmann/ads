<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client_product');
            $table->integer('id_create');
            $table->integer('id_update');
            $table->string('name_product');
            $table->integer('id_category')->nullable();
            $table->integer('id_brand')->nullable();
            $table->decimal('retaiprice_product',18,2)->nullable();
            $table->decimal('specialprice_product',18,2)->nullable();
            $table->integer('texid_brand')->nullable();
            $table->integer('enblecommission_id')->nullable();
            $table->string('barcode_product')->nullable();
            $table->string('sku_product')->nullable();
            $table->text('discryption_product')->nullable();
            $table->decimal('supplyprice_product')->nullable();
            $table->integer('initialstock_product')->nullable();
            $table->integer('id_supplier')->nullable();
            $table->integer('reorderpoint_product')->nullable();
            $table->integer('reorderqty_product')->nullable();
            $table->integer('status_product')->nullable();
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
        Schema::dropIfExists('products');
    }
}
