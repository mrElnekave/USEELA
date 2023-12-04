
# Check if the file .env exists

if [ ! -f .env ]; then
    echo "File .env not found!"
    exit 1
else
    echo "File .env found!"
fi
