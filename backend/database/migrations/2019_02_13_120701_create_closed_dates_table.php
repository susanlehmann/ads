<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClosedDatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('closed_dates', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('business_id');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->integer('noo_days')->nullable();
            $table->text('description')->nullable();
            $table->integer('user_created')->nullable();
            $table->integer('user_update')->nullable();
            $table->integer('status');
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
        Schema::dropIfExists('closed_dates');
    }
}
