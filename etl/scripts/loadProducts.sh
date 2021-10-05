echo ===========================================
echo Starting ETL
echo ===========================================
PS3="Please select what you need in your database: "
options=(products variants)
select type in "${options[@]}";
do 
  if [[ $type == "products" ]]; then
    echo ===========================================
    echo -e Loading all $type to database
    echo ===========================================
    go run ../ -t $type
    break;
  elif [[ $type == "variants" ]]; then
    echo ===========================================
    echo -e Loading all $type to database
    echo ===========================================
    go run ../ -t $type
    break;
  else
    echo Invalid entry
    break;
  fi
  # case $opt in
  #   "Products")
  #   type=products
  #     echo ===========================================
  #     echo Loading all $type to database
  #     echo ===========================================
  #   "Variants")
  #   type=variants
  #     echo ===========================================
  #     echo Loading all $type to database
  #     echo ===========================================
done

# PS3="Choose an animal: "
# options=(cat dog mouse chair cow bird apple)
# select menu in "${options[@]}";
# do
#   echo -e "\nyou picked $menu ($REPLY)"
#   if [[ $menu == "chair" || $menu == "apple" ]]; then
#     echo -e "$menu is not an animal\n"
#   else
#     echo "$menu is an animal"
#     break;
#   fi
# done

# if [ "$TYPE" == "products" ]; then
# go run ../ -t products
# else
# go run ../ -t variants

# echo ===========================================
# echo Loading all products data to database
# echo ===========================================
# go run ../
# cd app