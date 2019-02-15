<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServiceGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_groups', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client');
            $table->integer('id_create_service_group');
            $table->string('name_service_group');
            $table->string('color_service_group')->nullable();
            $table->text('description_service_group')->nullable();
            $table->integer('level_service_group');
            $table->integer('status_service_group');
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
        Schema::dropIfExists('service_groups');
    }
}
