# Git branch 전략
![브랜치 전략]("https://github.com/JNU-econovation/econo-sigma/assets/73173356/3b6e0bbe-8c41-486b-9fc9-320838b3df0e")
> main - develop - FE/BE - feature(origin:main)

## Pull Request 예시
- main
- develop
  - FE
  - BE
1. origin : feat/1/login -> origin : main
2. origin : main -> upstream : BE
3. upstream : BE -> upstream : develop
4. upstream : develop -> upstream : main

각 브랜치 별 상세 규칙
---
main 
---
모든 테스트를 거친 최종 브랜치

develop
---
기능 개발 브랜치  

FE/BE
---
각 분야별 브랜치
## {Type}/{issue}/{feature}
>## Type 종류  
>feat : 새로운 기능    
>fix : 버그 수정    
>chore : 빌드 관련  
>ci : ci 관련  
>docs : 문서 수정  
>style : 코드 스타일  
>refactor : 리팩토링  
>test : 테스트 코드  
>## issue
>이슈 번호
>## example
>feat/1/get-bookinfo  
>chore/2/delete-readme
