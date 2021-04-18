<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Globals extends Model
{
    public function imageUpload($image, $folderPath)
    {
        $file = $image;
        $extension = $file->getClientOriginalExtension();
        $fileName =  date('Y-m-d-H-i-s-U') . '.' . $extension;
        $file->move('images'.$folderPath, $fileName);
        $filePath = $folderPath . $fileName;
        return $filePath;
    }
}
