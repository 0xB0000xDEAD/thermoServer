# thermo v0.0.1



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Node](#node)
	- [Create node](#create-node)
	- [Delete node](#delete-node)
	- [Retrieve node](#retrieve-node)
	- [Retrieve nodes](#retrieve-nodes)
	- [Update node](#update-node)
	
- [ThermoNode](#thermonode)
	- [Create thermo node](#create-thermo-node)
	- [Delete thermo node](#delete-thermo-node)
	- [Retrieve thermo node](#retrieve-thermo-node)
	- [Retrieve thermo nodes](#retrieve-thermo-nodes)
	- [Update thermo node](#update-thermo-node)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Node

## Create node



	POST /nodes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Node's name.</p>							|
| temp			| 			|  <p>Node's temp.</p>							|
| temp1			| 			|  <p>Node's temp1.</p>							|
| temp2			| 			|  <p>Node's temp2.</p>							|
| temp3			| 			|  <p>Node's temp3.</p>							|
| temp4			| 			|  <p>Node's temp4.</p>							|
| status			| 			|  <p>Node's status.</p>							|

## Delete node



	DELETE /nodes/:id


## Retrieve node



	GET /nodes/:id


## Retrieve nodes



	GET /nodes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update node



	PUT /nodes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Node's name.</p>							|
| temp			| 			|  <p>Node's temp.</p>							|
| temp1			| 			|  <p>Node's temp1.</p>							|
| temp2			| 			|  <p>Node's temp2.</p>							|
| temp3			| 			|  <p>Node's temp3.</p>							|
| temp4			| 			|  <p>Node's temp4.</p>							|
| status			| 			|  <p>Node's status.</p>							|

# ThermoNode

## Create thermo node



	POST /thermoNodes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Thermo node's name.</p>							|
| status			| 			|  <p>Thermo node's status.</p>							|
| temp			| 			|  <p>Thermo node's temp.</p>							|

## Delete thermo node



	DELETE /thermoNodes/:id


## Retrieve thermo node



	GET /thermoNodes/:id


## Retrieve thermo nodes



	GET /thermoNodes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update thermo node



	PUT /thermoNodes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| name			| 			|  <p>Thermo node's name.</p>							|
| status			| 			|  <p>Thermo node's status.</p>							|
| temp			| 			|  <p>Thermo node's temp.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's picture.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


