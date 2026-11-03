# Portfolio: Laravel + Inertia.js + React

## Setup

```bash
composer create-project laravel/laravel portfolio && cd portfolio
composer require inertiajs/inertia-laravel
npm install react react-dom @inertiajs/react @vitejs/plugin-react
npm remove tailwindcss @tailwindcss/vite          # Laravel 12 ships Tailwind 4; this project uses v3
npm install -D tailwindcss@3 postcss autoprefixer
```

1. Copy every file from this folder into the project (overwrite when asked). Delete `resources/js/bootstrap.js` imports if Laravel's default `app.js` is still referenced anywhere.
2. In `bootstrap/app.php`, register the Inertia middleware:
   ```php
   ->withMiddleware(function (Middleware $middleware) {
       $middleware->web(append: [\App\Http\Middleware\HandleInertiaRequests::class]);
   })
   ```
3. In `database/seeders/DatabaseSeeder.php`, inside `run()`, add `$this->call(ProjectSeeder::class);`
4. Copy your images into `public/images/`: `IMAGES.png`, and rename the two screenshots to `portfolio-website.png` and `student-app.png` (file names with spaces cause trouble).
5. Paste the contents of your old `css/styles.css` into `resources/css/app.css` (below the Tailwind lines).
6. Run:
   ```bash
   php artisan storage:link
   php artisan migrate --seed
   composer run dev
   ```
7. Open `/` for the public portfolio and `/admin/projects` for the CRUD pages. Run the validation tests with `php artisan test`.

## Part 1: Conversion summary

| Original | Now |
|---|---|
| `index.html` | `resources/views/app.blade.php` (shell) + `Pages/Home.jsx` |
| Nav / footer / section titles / cards | `Navbar`, `Footer`, `SectionTitle`, `Card`, `Timeline`, `ProjectCard`, `ThemeToggle` components |
| `js/main.js` dark mode, mobile menu, hero word, filter, contact form | React state in `ThemeToggle`, `Navbar`, `Hero`, `Sections/Projects`, `ContactForm` |
| `js/theme-init.js` | inline script in `app.blade.php` (runs before paint) |
| `js/tailwind-config.js` | `tailwind.config.js` (same colors and fonts) |

Small fixes made during conversion: the email link now uses `mailto:`, the LinkedIn URL no longer contains a raw space (please confirm it is your real profile link), the second project card had the wrong image description, and "HTMl" / "javasist" typos were corrected.

## Part 2: Chosen section

**Section: Projects.** Projects are the part of a portfolio that changes most often, and they are what employers look at first. In the HTML version, adding a project meant editing code and re-uploading the site. With a database, I add, fix, reorder or remove a project from a form, and the public page updates immediately without touching code. The same data can also be searched, validated and reused (for example, a "latest 3 projects" strip) from one source.

### Fields

| Field | Type | Why it is needed |
|---|---|---|
| `title` | string(100), unique | Name shown on the card; unique so two projects are never confused. |
| `category` | string(20): `web` or `mobile` | Powers the "Websites / Mobile Apps" filter on the public page. |
| `description` | text | Explains what the project does and what I built. |
| `tech_stack` | string(150) | Shows which tools I used (comma-separated), which employers scan for. |
| `project_url` | string, nullable | Link to the live demo, if there is one. |
| `repository_url` | string, nullable | Link to the source code on GitHub. |
| `image_path` | string, nullable | Screenshot shown on the card (uploaded file path). |
| `date_completed` | date | Lets me sort and show when the work was finished. |
| `display_order` | unsigned small integer | Lets me decide which projects appear first. |

### Validation rules

1. `title`: required, string, 3 to 100 characters, unique (ignoring the current record on update).
2. `category`: required, must be `web` or `mobile`.
3. `description`: required, 20 to 500 characters.
4. `tech_stack`: required, max 150 characters.
5. `project_url` and `repository_url`: optional, but if given must be a valid URL (max 255).
6. `date_completed`: required, a valid date, not in the future.
7. `display_order`: required, an integer from 0 to 999.
8. `image`: optional, must be an image of type jpg, jpeg, png or webp, max 2 MB.

Custom messages (examples): "You already have a project with this title. Pick a different one." and "The image must be 2 MB or smaller." See `app/Http/Requests/ProjectRequest.php`.

## Part 3: Requirement checklist

| Requirement | Where |
|---|---|
| Migration (9 fields) | `database/migrations/2026_10_25_000000_create_projects_table.php` |
| Model with `$fillable` | `app/Models/Project.php` |
| Resource controller | `app/Http/Controllers/ProjectController.php` |
| `Route::resource()` | `routes/web.php` (`show` is excluded because there is no Show page) |
| Validation + custom messages | `app/Http/Requests/ProjectRequest.php` |
| Index / Create / Edit pages | `resources/js/Pages/Projects/` |
| Reusable components | `ProjectForm`, `FormField`, `ConfirmModal`, `FlashMessage` |
| Errors beside fields, input kept | `FormField` shows `errors[field]`; Inertia `useForm` keeps typed values |
| Success messages | `->with('success', ...)` in the controller, shown by `FlashMessage` |
| Delete confirmation | `ConfirmModal` on the Index page |
| Public display | `PortfolioController` sends projects to `Home.jsx` |
| Bonus | Search, pagination, display order |

Not done: login protection. Before deploying, wrap the `/admin` route group in `->middleware('auth')` (for example with Laravel Breeze), otherwise anyone who finds `/admin/projects` can edit your portfolio.

## Part 4: Validation test table

Each row is covered by an automated test in `tests/Feature/ProjectValidationTest.php`. Run `php artisan test`, then fill in the last two columns from what you see in the browser (take a screenshot of the error message beside the field).

| # | Field | Test input | Rule tested | Expected result | Passed? | Screenshot |
|---|---|---|---|---|---|---|
| 1 | all | Valid values | all rules | Saved, redirect, "Project created." | | |
| 2 | title | empty | required | Error: title is required | | |
| 3 | title | `ab` | min:3 | Error beside title | | |
| 4 | title | 101 characters | max:100 | Error beside title | | |
| 5 | title | existing title (create) | unique | "You already have a project with this title…" | | |
| 6 | title | same title, editing the same record | unique ignores current | Saves without error | | |
| 7 | title | another project's title (edit) | unique | Error beside title | | |
| 8 | category | `desktop` | in:web,mobile | Error beside category | | |
| 9 | description | `Too short` | min:20 | "Describe the project in at least 20 characters." | | |
| 10 | project_url | `not a url` | url | "Enter a full link, starting with http://…" | | |
| 11 | project_url / repository_url | empty | nullable | Saves without error | | |
| 12 | date_completed | tomorrow's date | before_or_equal:today | "The completion date cannot be in the future." | | |
| 13 | display_order | `first` | integer | Error beside display order | | |
| 14 | display_order | `1000` | between:0,999 | "Display order must be a whole number from 0 to 999." | | |
| 15 | image | a `.pdf` file | image, mimes | "The image must be a JPG, PNG or WEBP file." | | |
| 16 | image | file over 2 MB | max:2048 | "The image must be 2 MB or smaller." | | |

Also check by hand: after a failed submit, the other fields still contain what you typed (the file input must be chosen again by the browser's design).
