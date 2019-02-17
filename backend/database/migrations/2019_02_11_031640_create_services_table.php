<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_service_group');
            $table->integer('id_client');
            $table->integer('id_create');
            $table->integer('id_update');
            $table->integer('id_business')->nullable();
            $table->string('name_service');
            $table->time('duration_service')->nullable();
            $table->decimal('retail_price_service',18,2)->nullable();
            $table->string('name_pricing_service')->nullable();
            $table->decimal('special_price_service',18,2)->nullable();
            $table->json('id_staff')->nullable();
            $table->string('resource_requireb_service')->nullable();
            $table->text('online_booking_service')->nullable();
            $table->text('setting_service')->nullable();
            $table->integer('status_service')->nullable();
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
        Schema::dropIfExists('services');
    }
}
