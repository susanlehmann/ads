<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


		$permissions = array(
		   0 => array(
			'name' => 'role-list',
			'view_name' => 'view list role'
		   ),
		   1 => array(
			'name' => 'role-create',
			'view_name' => 'add role'
		   ),
		   2 => array(
			'name' => 'role-edit',
			'view_name' => 'edit role'
		   ),
		   3 => array(
			'name' => 'role-delete',
			'view_name' => 'delete role'
		   )
		);

		$conver = (object)$permissions;

        foreach ($conver as $permission) {
             Permission::create(['name' => $permission['name'],'view_name' => $permission['view_name']]);
        }
    }
}
