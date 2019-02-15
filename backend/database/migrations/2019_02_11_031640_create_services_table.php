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
            $table->integer('id_treatment')->nullable();
            $table->string('name_service');
            $table->string('pricing_type')->nullable();
            $table->string('availablefor')->nullable();
            $table->string('extra_time_type')->nullable();
            $table->integer('extra_time_duration')->nullable();
            $table->integer('id_tax')->nullable();
            $table->decimal('tax_rate', 18, 1)->nullable();
            $table->string('enable_commission')->nullable();
            $table->string('resource_requireb')->nullable();
            $table->string('enableonline_bookings')->nullable();
            $table->string('enable_voucher_sales')->nullable();
            $table->string('voucher_expiryperiod')->nullable();
            $table->string('service_description')->nullable();
            $table->integer('id_create');
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
