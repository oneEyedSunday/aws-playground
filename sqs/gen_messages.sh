allNames=($(whoami) 'Ravi' "Sani" "Ribaud" "George" "Hanley" "Anna" "Kendrick" "Shakira" "Methuselah" "Riri" "Kendall" "Adonis" "levi" "Mikasa" "Sansa")

no_messages=${1}

echo "Attemting to generate ${no_messages} messages"

i=$no_messages

if [[ 1 > $i ]]
then
    i=${#allNames[@]};
fi 

while [[ $i -ge 1 ]]
do
    node send.js "{ \"id\": \"payload_$i\", \"artist_name\": \"${allNames[i]}\" }"
    (( i = i -1 ))
done