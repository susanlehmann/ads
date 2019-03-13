<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_details', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client');
            $table->intager('id_create')->nullable();
            $table->integer('id_update')->nullable();
            $table->integer('id_business_type')->nullable();
            $table->string('company_name')->nullable();
            $table->text('company_desscription')->nullable();
            $table->string('company_address')->nullable();
            $table->string('company_website')->nullable();
            $table->string('company_contac_number')->nullable();
            $table->integer('company_timezone')->nullable();
            $table->integer('company_timeformat')->nullable();
            $table->string('company_countruy')->nullable();
            $table->string('company_currency')->nullable();
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
        Schema::dropIfExists('company_details');
    }
}
