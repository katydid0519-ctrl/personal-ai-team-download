# Personal AI Team 다운로드 페이지

이 저장소는 **Netlify에 연결할 공개 정적 다운로드 페이지**와 공개 릴리스만 담습니다. 실제 앱 소스 저장소와 사용자 데이터는 포함하지 않습니다.

## Netlify 연결

1. Netlify에서 **Add new project** → **Import an existing project**를 선택합니다.
2. GitHub 저장소 `katydid0519-ctrl/personal-ai-team-download`을 선택합니다.
3. Build command는 비워 두고, Publish directory는 `.`로 둡니다.
4. Deploy를 누르면 발급된 Netlify 주소가 이 다운로드 페이지의 공유 링크가 됩니다.

설치 파일은 Netlify가 아니라 GitHub Releases에서 제공됩니다. 대용량 Windows 설치 파일을 정적 사이트 배포에 포함하지 않고, 페이지의 두 다운로드 버튼이 해당 공개 릴리스 파일로 연결됩니다.

## 배포 파일

- 설치형: `Personal-AI-Team-Setup-0.8.4.exe`
- 포터블: `Personal-AI-Team-0.8.4.exe`
- 파일 무결성 확인: 릴리스의 `SHA256SUMS-0.8.4.txt`

첫 안내에서 샘플 팀의 7개 담당 업무·작동 규칙을 적용하고, 팀장 지시 예시를 복사해 첫 요청을 연습할 수 있습니다. 이후에는 앱의 설정에서 샘플 팀을 다시 불러오거나 기본 팀으로 초기화할 수 있습니다.

## 공개 직원 프로필

`staff-profiles.js`에는 공개를 승인한 `roles.json`의 직원 이름, 역할, 모델, 설명과 작동 규칙을 넣습니다. 방문자는 페이지에서 각 직원의 규칙 또는 전체 프로필을 복사할 수 있습니다.

새 직원 설정으로 바꾸려면 아래처럼 실행한 뒤 `staff-profiles.js` 변경을 검토·커밋합니다. 개인 대화, API 키, 작업 폴더, 이미지 원본이나 공개하지 않을 규칙은 입력 JSON에서 먼저 제외합니다.

```powershell
node scripts/generate-staff-profiles.mjs "C:\경로\roles.json"
```
