<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusinessTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business_types', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_create');
            $table->integer('id_update');
            $table->string('name_busiess_type');
            $table->text('description_busiess_type')->nullable();
            $table->integer('status_busiess_type');
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
        Schema::dropIfExists('business_types');
    }
}
