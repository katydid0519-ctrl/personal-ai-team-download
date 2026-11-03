(() => {
  const profiles = Array.isArray(window.staffProfiles) ? window.staffProfiles : [];
  const grid = document.querySelector('#staff-profiles');
  const search = document.querySelector('#profile-search');
  const count = document.querySelector('#profile-result-count');
  const copyAll = document.querySelector('#copy-all-profiles');
  const roleLabels = { manager: '총괄', specialist: '전문 담당', docs: '문서·운영 담당' };

  const profileText = (profile) => [
    '[직원 프로필]',
    `이름: ${profile.name}`,
    `역할: ${roleLabels[profile.kind] || profile.kind || '미지정'}`,
    `모델: ${profile.model || '미지정'}`,
    `설명: ${profile.description || '설명 없음'}`,
    '',
    '[작동 규칙]',
    profile.instructions || '등록된 작동 규칙이 없습니다.',
  ].join('\n');

  const copyText = async (value, button) => {
    const original = button.textContent;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        if (!document.execCommand('copy')) throw new Error('copy failed');
        field.remove();
      }
      button.textContent = '복사했습니다';
    } catch {
      button.textContent = '복사에 실패했습니다';
    }
    window.setTimeout(() => { button.textContent = original; }, 1800);
  };

  const card = (profile) => {
    const item = document.createElement('article');
    item.className = 'profile-card';
    item.dataset.search = [profile.name, profile.description, profile.model, profile.instructions, roleLabels[profile.kind]].filter(Boolean).join(' ').toLocaleLowerCase();

    const header = document.createElement('header');
    header.className = 'profile-card-header';
    const heading = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = profile.name;
    const role = document.createElement('p');
    role.className = 'profile-role';
    role.textContent = roleLabels[profile.kind] || profile.kind || '직원';
    heading.append(title, role);
    const model = document.createElement('p');
    model.className = 'profile-model';
    model.textContent = profile.model || '모델 미지정';
    header.append(heading, model);

    const description = document.createElement('p');
    description.className = 'profile-description';
    description.textContent = profile.description || '설명이 등록되지 않았습니다.';

    const details = document.createElement('dl');
    details.className = 'profile-details';
    [['프로필 ID', profile.id], ['규칙 분량', profile.instructions ? `${profile.instructions.length.toLocaleString()}자` : '등록 없음']].forEach(([label, value]) => {
      const box = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = label;
      definition.textContent = value || '미지정';
      box.append(term, definition);
      details.append(box);
    });

    const rules = document.createElement('details');
    rules.className = 'profile-rules';
    const summary = document.createElement('summary');
    summary.textContent = profile.instructions ? '작동 규칙 전체 보기' : '등록된 작동 규칙 없음';
    rules.append(summary);
    if (profile.instructions) {
      const ruleText = document.createElement('pre');
      ruleText.className = 'rule-text';
      ruleText.textContent = profile.instructions;
      rules.append(ruleText);
    }

    const actions = document.createElement('div');
    actions.className = 'profile-actions';
    const copyRules = document.createElement('button');
    copyRules.className = 'button primary';
    copyRules.type = 'button';
    copyRules.textContent = '규칙만 복사';
    copyRules.disabled = !profile.instructions;
    copyRules.addEventListener('click', () => copyText(profile.instructions, copyRules));
    const copyProfile = document.createElement('button');
    copyProfile.className = 'button secondary';
    copyProfile.type = 'button';
    copyProfile.textContent = '프로필 전체 복사';
    copyProfile.addEventListener('click', () => copyText(profileText(profile), copyProfile));
    actions.append(copyRules, copyProfile);

    item.append(header, description, details, rules, actions);
    return item;
  };

  if (!grid) return;
  if (!profiles.length) {
    grid.innerHTML = '<p class="profile-empty">공개 직원 프로필을 불러오지 못했습니다.</p>';
    return;
  }
  const cards = profiles.map((profile) => card(profile));
  grid.append(...cards);

  const filter = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach((item) => {
      const matched = !query || item.dataset.search.includes(query);
      item.hidden = !matched;
      if (matched) visible += 1;
    });
    count.textContent = query ? `${visible}명의 직원 프로필이 검색되었습니다.` : `${profiles.length}명의 직원 프로필을 보고 있습니다.`;
  };
  search?.addEventListener('input', filter);
  copyAll?.addEventListener('click', () => copyText(profiles.map(profileText).join('\n\n' + '─'.repeat(44) + '\n\n'), copyAll));
  filter();
})();
