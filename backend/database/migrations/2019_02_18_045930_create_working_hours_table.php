<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkingHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('working_hours', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('location_id')->nullable();
            $table->integer('id_client')->nullable();
            $table->integer('id_staff')->nullable();
            $table->integer('id_create')->nullable();
            $table->integer('id_update')->nullable();
            $table->integer('day_of_week')->nullable();
            $table->date('date_working')->nullable();
            $table->time('shift1_start')->nullable();
            $table->time('shift1_end')->nullable();
            $table->time('shift2_start')->nullable();
            $table->time('shift2_end')->nullable();
            $table->integer('is_repeat')->nullable();
            $table->integer('repeat_weekly')->nullable();
            $table->date('end_repeat')->nullable();
            $table->integer('status_workinghour')->nullable();
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
        Schema::dropIfExists('working_hours');
    }
}
