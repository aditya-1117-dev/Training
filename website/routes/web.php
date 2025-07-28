<?php

use App\Livewire\Web\About;
use App\Livewire\Web\Blogs;
use App\Livewire\Web\Index;
use App\Livewire\Web\Videos;
use App\Livewire\Web\Recipes;

use App\Livewire\Web\Category;
use App\Livewire\Web\ContactUs;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Middleware\isActive;
use App\Http\Middleware\location;
use App\Livewire\Dashboard\Image;
use App\Livewire\Dashboard\Users;
use App\Livewire\Dashboard\Recipe;
use App\Livewire\Dashboard\ComboRecipe;
use App\Livewire\Dashboard\Slider;

use App\Livewire\Web\SingleRecipe;
use App\Livewire\Dashboard\Trending;
use Illuminate\Support\Facades\Route;
use App\Livewire\Dashboard\About as DashboardAbout;
use App\Livewire\Dashboard\Index as DashboardIndex;
use App\Livewire\Dashboard\Setting as DashboardSetting;
use App\Livewire\Dashboard\Category as DashboardCategory;
use Illuminate\Support\Facades\Artisan;


 
        Route::get('/', Index::class)->name('index');
        Route::get('/about-us', About::class)->name('about');
        Route::get('/recipes/{id?}/{query?}', Recipes::class)->name('recipes');
        Route::get('/recipe/{id}', SingleRecipe::class)->name('recipe');
        Route::get('/categories', Category::class)->name('categories');
        Route::get('/blogs', Blogs::class)->name('blogs');
        Route::get('/blog/{$id}', Blogs::class)->name('blog');
        Route::get('/videos', Videos::class)->name('videos');
        Route::get('/contact-us', ContactUs::class)->name('contact');
  

    Route::get('/pdf', function(){
        
        $pdf = Pdf::loadView('livewire.web.recipe_pdf');
        return $pdf->download('invoice.pdf');
    });

// Admin Routes
    Route::middleware(['auth', isActive::class])->prefix('admin')->name('admin.')->group(function(){
    
        Route::get('/', DashboardIndex::class)->name('dashboard');
        Route::get('/slider',Slider::class)->name('slider');
        Route::get('/recipes',Recipe::class)->name('recipes');
        Route::get('/combo-recipes',ComboRecipe::class)->name('comborecipes');
        Route::get('/category',DashboardCategory::class)->name('category');
        Route::get('/trend',Trending::class)->name('trend');
        Route::get('/image',Image::class)->name('images');
        Route::get('/setting',DashboardSetting::class)->name('setting');
        Route::get('/about',DashboardAbout::class)->name('about');
        Route::get('/users',Users::class)->name('users');
    
    });

Route::get("/clear", function () {
    
    // $targetFolder = storage_path("app/public");
    // $linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/storage';
    // symlink($targetFolder, $linkFolder);
    
       
        Artisan::call('optimize');
        Artisan::call('cache:clear');
        Artisan::call('route:cache');
        
    return back();
});

//Clear Cache facade value:
Route::get('/clear-cache', function() {
    $exitCode = Artisan::call('cache:clear');
    return '<h1>Cache facade value cleared</h1>';
});

//Reoptimized class loader:
Route::get('/optimize', function() {
    $exitCode = Artisan::call('optimize');
    return '<h1>Reoptimized class loader</h1>';
});

//Route cache:
Route::get('/route-cache', function() {
    $exitCode = Artisan::call('route:cache');
    return '<h1>Routes cached</h1>';
});

//Clear Route cache:
Route::get('/route-clear', function() {
    $exitCode = Artisan::call('route:clear');
    return '<h1>Route cache cleared</h1>';
});

//Clear View cache:
Route::get('/view-clear', function() {
    $exitCode = Artisan::call('view:clear');
    return '<h1>View cache cleared</h1>';
});

//Clear Config cache:
Route::get('/config-cache', function() {
    $exitCode = Artisan::call('config:cache');
    return '<h1>Clear Config cleared</h1>';
});


require __DIR__.'/auth.php';


