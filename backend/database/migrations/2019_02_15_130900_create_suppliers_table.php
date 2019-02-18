<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('suppliers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client_supplier');
            $table->integer('id_create');
            $table->integer('id_update');
            $table->string('name_supplier');
            $table->text('discription_suppliner')->nullable();
            $table->string('firtname_supplier')->nullable();
            $table->string('lasname_supplier')->nullable();
            $table->string('email_supplier')->nullable();
            $table->string('mobilenumber_supplier')->nullable();
            $table->string('telephone_supplier')->nullable();
            $table->string('website_supplier')->nullable();
            $table->text('street_supplier')->nullable();
            $table->string('suburb_supplier')->nullable();
            $table->string('city_supplier')->nullable();
            $table->string('state_supplier')->nullable();
            $table->string('zipcode_supplier')->nullable();
            $table->integer('countryid_supplier')->nullable();
            $table->integer('status_supplier')->nullable();
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
        Schema::dropIfExists('suppliers');
    }
}
