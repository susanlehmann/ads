<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBrandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('brands', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_client_brand');
            $table->integer('id_create');
            $table->integer('id_update');
            $table->string('name_brand');
            $table->text('description')->nullable();
            $table->integer('status_brand');
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
        Schema::dropIfExists('brands');
    }
}
