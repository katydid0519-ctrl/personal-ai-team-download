# Personal AI Team 다운로드 페이지

이 저장소는 **Netlify에 연결된 공개 정적 다운로드 페이지**와 공개 릴리스만 담습니다. 실제 앱 소스 저장소와 사용자 데이터는 포함하지 않습니다.

## Netlify 연결

공개 페이지: <https://personal-ai-team-download.netlify.app/>

Netlify 프로젝트 `personal-ai-team-download`는 이 GitHub 저장소의 `main` 브랜치와 연결되어 있습니다. `main`에 페이지 변경을 푸시하면 Netlify가 새 배포를 시작합니다. Build command는 비워 두고 Publish directory는 `.`입니다. 실제 게시 여부는 Netlify의 **Production deploys**에서 `Published` 상태와 배포 커밋을 확인합니다.

설치 파일은 Netlify가 아니라 GitHub Releases에서 제공됩니다. 대용량 앱 파일을 정적 사이트 배포에 포함하지 않고, 운영체제별 다운로드 버튼이 공개 릴리스 파일로 연결됩니다.

## v0.8.7 배포 파일

- Windows x64 설치형: `Personal-AI-Team-Setup-0.8.7.exe`
- Windows x64 포터블: `Personal-AI-Team-0.8.7.exe`
- macOS Apple Silicon: `Personal-AI-Team-0.8.7-mac-arm64.dmg`, `Personal-AI-Team-0.8.7-mac-arm64.zip`
- Linux x64: `Personal-AI-Team-0.8.7-linux-x86_64.AppImage`, `Personal-AI-Team-0.8.7-linux-amd64.deb`
- 파일 무결성 확인: 릴리스의 `SHA256SUMS-0.8.7.txt`
- 공개 Release 대상: <https://github.com/katydid0519-ctrl/personal-ai-team-download/releases/tag/v0.8.7>

사이트의 파일 링크는 위 공개 저장소의 Release 자산을 가리킵니다. **각 운영체제 파일과 검증값을 먼저 게시하고 링크를 확인한 뒤** 이 정적 페이지를 배포합니다. macOS 앱은 Apple 공증을 받지 않았으므로 첫 실행 시 추가 확인이 필요할 수 있습니다.

## 업데이트 안내

- v0.8.5의 **설정 → AI 연결**에서 Codex 상태, 계정, 사용 가능한 모델을 확인하고 ChatGPT로 로그인할 수 있습니다. Codex 자동 탐색에 실패하면 실행 파일을 직접 선택합니다.
- v0.8.6의 사무실 꾸미기에서 전체 색상 테마 3종, 가구 마감, 이동 가능한 구역 푯말을 제공합니다.
- 가구 복사·붙여넣기 `Ctrl+C/V`, 실행취소 `Ctrl+Z`, 다시 실행 `Ctrl+Y` 또는 `Ctrl+Shift+Z`, 삭제 `Del`을 지원합니다. 구역 밖으로 밀린 가구는 한 번의 경고와 테두리로 표시합니다.
- v0.8.7은 팀장석의 책상·모니터·직원 배치를 다듬고, 모니터의 작업·승인·완료 상태에서 관련 업무를 열 수 있습니다.
- 가구 배치 미리보기와 통행 가능 여부, 오류 위치로 이동, 책상 재배정, 미저장 변경 안내를 추가했습니다.
- 헤어·눈·표정 확대 및 다방향 비교, 옆모습 입 모양과 이동 장면, 축소 시 이름 가독성을 개선했습니다.
- 기존 직원 설정, 외형, 대화와 작업 자료는 각 PC의 데이터 폴더에 이어서 보관됩니다. 새 버전을 실행하기 전 기존 앱을 종료합니다.

첫 안내에서 샘플 팀의 7개 담당 업무·작동 규칙을 적용하고, 팀장 지시 예시를 복사해 첫 요청을 연습할 수 있습니다. 이후에는 앱의 설정에서 샘플 팀을 다시 불러오거나 기본 팀으로 초기화할 수 있습니다.

## 공개 직원 프로필

`staff-profiles.js`에는 공개를 승인한 `roles.json`의 직원 이름, 역할, 모델, 설명과 작동 규칙을 넣습니다. 방문자는 페이지에서 각 직원의 규칙 또는 전체 프로필을 복사할 수 있습니다.

새 직원 설정으로 바꾸려면 아래처럼 실행한 뒤 `staff-profiles.js` 변경을 검토·커밋합니다. 개인 대화, API 키, 작업 폴더, 이미지 원본이나 공개하지 않을 규칙은 입력 JSON에서 먼저 제외합니다.

```powershell
node scripts/generate-staff-profiles.mjs "C:\경로\roles.json"
```
