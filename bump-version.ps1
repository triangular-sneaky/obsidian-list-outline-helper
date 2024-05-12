Set-PSDebug -Trace 1

$manifest = gc ./manifest.json | ConvertFrom-Json

$v = $manifest.version;

$parsedV = $v -split '\.';
$parsedV[2] = ([int]$parsedV[2]) + 1;
$v = $parsedV -join '.';

$manifest.version = $v;
$manifest | convertto-json -depth 99 | set-content ./manifest.json -Encoding utf8;

git add ./manifest.json;
git commit -m "Bumping version to $v";

git tag -a $v -m "$v";
git push origin $v;
