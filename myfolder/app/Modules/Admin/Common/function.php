<?php

function node_merge($node, $access= null, $pid = 0){
	$ary = array();

	foreach ($node as $value) {
		if (is_array($access)) {
			$value['access'] = in_array($value['id'], $access) ? 1 : 0;
		}
		if ($value['pid'] == $pid) {
			$value['child'] = node_merge($node, $access, $value['id']);
			$ary[] = $value;
		}
	}

	return $ary;
}
