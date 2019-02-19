<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_create')->nullable();
            $table->integer('id_update')->nullable();
            $table->integer('id_client_app');
            $table->integer('id_customer');
            $table->date('date_appoint');
            $table->text('info_appoint'); // not array object
            $table->text('note_appoint')->nullable();
            $table->integer('status_appoint');
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
        Schema::dropIfExists('appointments');
    }
}
