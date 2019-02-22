<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
class pdfController extends Controller
{
    public function index()
    {
    	$data = ['name' => 'tienduong'];	
    	$pdf = PDF::setOptions(['defaultFont' => 'dejavu serif'])->loadView('pdf.invoice',  compact('data'));
    		return $pdf->download('invoice.pdf');
    }
}
