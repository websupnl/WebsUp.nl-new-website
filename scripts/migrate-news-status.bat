@echo off
REM Migrate news_articles from published=true to status='published' via Supabase API

setlocal enabledelayedexpansion

REM Load env variables
for /f "tokens=*" %%a in (.env.local) do set %%a
for /f "tokens=*" %%a in (.env) do set %%a

if not defined NEXT_PUBLIC_SUPABASE_URL (
  echo ❌ NEXT_PUBLIC_SUPABASE_URL not found in .env files
  exit /b 1
)

if not defined SUPABASE_SERVICE_ROLE_KEY (
  echo ❌ SUPABASE_SERVICE_ROLE_KEY not found in .env files
  exit /b 1
)

echo 🔄 Starting migration: published=true ^-^> status=published...
echo.

echo 1️⃣ Updating articles with published=true to status=published...

REM API call to update articles
curl -X PATCH !NEXT_PUBLIC_SUPABASE_URL!/rest/v1/news_articles?published=eq.true ^
  -H "Authorization: Bearer !SUPABASE_SERVICE_ROLE_KEY!" ^
  -H "Content-Type: application/json" ^
  -H "Prefer: return=minimal" ^
  -d "{"status":"published"}" ^
  --silent

if errorlevel 1 (
  echo ❌ Migration failed
  exit /b 1
)

echo ✅ Update complete!
echo.
echo 2️⃣ Verifying articles...

REM Get count of published articles
curl -X GET "!NEXT_PUBLIC_SUPABASE_URL!/rest/v1/news_articles?status=eq.published&select=id" ^
  -H "Authorization: Bearer !SUPABASE_SERVICE_ROLE_KEY!" ^
  --silent

echo.
echo 🎉 Migration complete! Articles should now appear on /nieuws
