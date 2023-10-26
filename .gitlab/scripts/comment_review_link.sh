#!/bin/bash

# Pass first argument for name review url
# Pass second argument for review url

IS_PASSED_VALIDATION=0

if [ -z "$CI_MERGE_REQUEST_IID" ]
then
  echo "not in merge request. exiting..."
  exit 0
fi


if [ -z "$GITLAB_PA_TOKEN" ]
then
  echo "missing env variable GITLAB_PA_TOKEN."
  IS_PASSED_VALIDATION=1
fi

if [ -z "$CI_PROJECT_ID" ]
then
  echo "missing env variable CI_PROJECT_ID."
  IS_PASSED_VALIDATION=1
fi

if [ -z "$1" ] || [ -z "$2" ]
then
  echo "missing required 2 positional arguments."
  IS_PASSED_VALIDATION=1
fi

if [ $IS_PASSED_VALIDATION -eq 1 ]
then
  exit 1
fi


EXISTING_COMMENTS=$(curl --request GET --header "PRIVATE-TOKEN: $GITLAB_PA_TOKEN" https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes --insecure)

BOT_COMMENTS=$(echo $EXISTING_COMMENTS | grep $2)

if [ -z "$BOT_COMMENTS" ]
then
  echo "commenting the review link..."
  curl --request POST --header "PRIVATE-TOKEN: $GITLAB_PA_TOKEN" https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes?body="Review%20URL%20$1:%20$2" --insecure
else
  echo "bot has commented the review link. no action needed."
fi
