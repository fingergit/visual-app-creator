<?php

class UserRelationModel extends RelationModel{
	protected $tableName = 'admin_user';
	
	protected $_link = array(
		'rbac_role' => array(
			'mapping_type' => MANY_TO_MANY,
			'foreign_key' => 'user_id',
			'relation_foreign_key' => 'role_id',
			'relation_table' => 'fin_rbac_role_user',
			'mapping_fields' => 'id, name, remark',
			),
		);
}