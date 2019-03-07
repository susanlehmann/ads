<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client_location');
            $table->integer('id_create');
            $table->integer('id_update');
            $table->string('name_location');
            $table->string('contact_member')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('street_address')->nullable();
            $table->string('optional')->nullable();
            $table->string('city_location')->nullable();
            $table->string('state_location')->nullable();
            $table->string('zip_code_location')->nullable();
            $table->integer('status_location')->nullable();
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
        Schema::dropIfExists('locations');
    }
}
