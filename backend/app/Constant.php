<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Constant extends Model
{
    const BANNER_IMAGE_PATH = '/banner/';
    const ABOUTUS_IMAGE_PATH = '/aboutus/';
    const TEAM_IMAGE = '/team/';
    const PRODUCT_IMAGE_FOLDER = '/product/';
    const PRODUCT_DETAILS_IMAGE_FOLDER = '/product/details/';
    const USER_STATUS_ACTIVE = 1;
    const ADMIN = 1;
    const USER = 2;
    const SYMPATHISANT = 1;
    const ABONNE = 2;
    const COFFRET_CADEAU = 3;
    const CARD = 2;
}
