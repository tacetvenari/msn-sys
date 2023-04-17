echo "Setting Path"
$env:Path="C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Users\rangeuser\Downloads\node-v18.15.0-win-x64\node-v18.15.0-win-x64;C:\Users\
Administrator\AppData\Local\Microsoft\WindowsApps;C:\Users\Administrator\Desktop\msn-sys-dev\node-v18.15.0-win-x64;C:\Users\Administrator\Desktop\msn-sys-dev\node-v18.15.0-win-x64\node_modules\.bin;"

echo "Ensuring Correct working dir"
cd C:\Users\Administrator\Desktop\msn-sys-dev\dashboard

#echo "Ensuring modules are installed"
#npm install --prefer-offline

echo "Setting Variables"
# MX Server
$Env:VITE_TAILNUMBERS='tv-01 tv-02 tv-05 tv-06' # Space delimited
$Env:VITE_WS_MX_URI='10.101.160.60'
$Env:VITE_WS_MX_PORT='8888'
$Env:VITE_WS_MX_PATH='/mx-dashboard'
$Env:VITE_WS_MX_CONTROL_PATH='/mx-controller'
$Env:VITE_WS_MX_SORTIE_PATH='/mx-sortie-state'

# MSN Server
#$Env:VITE_SHOPS='bcd gccs iamd intel freq wx' # Space delimited
$Env:VITE_SHOPS='BCD GCCS IAMD INTEL FREQ WX' # Space delimited, KEYS UPPER CASE
$Env:VITE_WS_MSN_URI='10.101.170.70'
$Env:VITE_WS_MSN_PORT='8889'
$Env:VITE_WS_MSN_PATH='/msn-dashboard'
$Env:VITE_WS_MSN_CONTROL_PATH='/msn-controller'


echo "Starting Server"
echo $env:VITE_SHOPS
npm run dev
