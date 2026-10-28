import { siteNotes } from '@/lib/editorial-notes';

export type DiscoverGuide = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  categorySlugs: string[];
  siteSlugs: string[];
  introduction: string;
  comparison: { need: string; choice: string; check: string }[];
  sections: { title: string; text: string }[];
  checklist: string[];
};

const publishedAt = '2026-10-28';

const guides: DiscoverGuide[] = [
  {
    slug: 'choose-design-tool',
    title: '캔바·피그마·미로, 만들 결과물에 따라 고르는 방법',
    summary:
      '포스터, 앱 화면, 회의 보드 중 무엇을 만들지부터 정하고 협업·내보내기·라이선스를 확인하는 순서예요.',
    publishedAt,
    categorySlugs: ['productivity', 'dev'],
    siteSlugs: ['canva', 'figma', 'miro'],
    introduction:
      '디자인 도구를 고를 때는 기능 수보다 마지막에 누구에게 무엇을 전달할지를 먼저 정해 보세요. 이미지 한 장을 게시하는 일, 앱 화면을 개발자와 논의하는 일, 회의에서 아이디어를 펼치는 일은 필요한 결과물이 달라요. 아래 비교는 우열 순위가 아니라 작업 목적에 따른 편집 제안이에요.',
    comparison: [
      {
        need: '카드뉴스·포스터·발표자료',
        choice: '캔바부터 살펴보기',
        check: '게시 규격, 유료 요소, 이미지·음원 라이선스',
      },
      {
        need: '웹·앱 화면 설계',
        choice: '피그마부터 살펴보기',
        check: '팀 파일 제한, 수정 권한, 개발자 전달 기능',
      },
      {
        need: '회의 아이디어·업무 흐름 정리',
        choice: '미로부터 살펴보기',
        check: '참여자의 접근 범위, 공개 링크 설정',
      },
    ],
    sections: [
      {
        title: '샘플 하나를 끝까지 만들어 보세요',
        text: '처음부터 전체 프로젝트를 옮기지 말고 실제 사용할 포스터 한 장, 화면 하나, 회의 보드 한 개를 골라 보세요. 만들기만 해서는 선택이 끝나지 않아요. 받을 사람에게 전달하고 파일이 열리는지, 글자가 잘리는지, 수정이 필요한지까지 확인해 보세요. 이 과정에서 편집은 쉬워도 전달이 어려운 도구를 일찍 발견할 수 있어요.',
      },
      {
        title: '무료 여부는 필요한 작업 단위로 확인하세요',
        text: '무료 계정이 있다고 모든 협업·내보내기 기능이 무료인 것은 아니에요. Figma Starter는 팀 파일과 기능에 제한이 있고 Dev Mode가 포함되지 않는다고 안내해요. 숫자만 외우기보다 우리 팀이 만들 파일, 수정할 사람, 전달할 방식이 현재 플랜에 포함되는지 공식 안내에서 확인하세요.',
      },
      {
        title: '공유 권한과 콘텐츠 이용권한은 달라요',
        text: '동료에게 편집 권한을 주는 일과 결과물에 들어간 사진·음원을 배포할 권한은 따로 확인해야 해요. Canva 콘텐츠는 유형과 이용 목적별 조건을 살펴보고, 외부 자료는 출처와 이용 조건을 함께 기록해 두세요. Miro 보드는 공개 링크와 특정 사용자 초대의 접근 범위가 다르므로 공유 대화상자에서 누가 접근할 수 있는지 확인하세요.',
      },
      {
        title: '도입 결정은 다음 사람이 이어받을 수 있을 때 하세요',
        text: '샘플을 만든 사람이 자리를 비워도 다른 팀원이 원본을 찾고 수정할 수 있어야 해요. 파일 이름, 보관할 팀, 담당자를 정하고 최종 전달본과 원본을 구분해 주세요. 이미지를 다시 수정해야 할 때 원본 링크부터 찾느라 시간을 쓰지 않도록 하는 것이 도구를 하나 더 도입하는 것보다 먼저예요.',
      },
    ],
    checklist: [
      '최종 결과물과 전달할 사람을 정했어요.',
      '실제 샘플을 만들어 전달·수정까지 확인했어요.',
      '필요한 기능의 비용과 자료의 라이선스를 확인했어요.',
      '공개 범위와 원본 보관 위치를 정했어요.',
    ],
  },
  {
    slug: 'small-team-collaboration',
    title: '노션·슬랙·미로로 협업할 때 자료가 흩어지지 않게 쓰는 법',
    summary:
      '대화, 최종 문서, 회의 보드를 구분하고 공유 권한과 인수인계 방법을 정해 보세요.',
    publishedAt,
    categorySlugs: ['productivity', 'career'],
    siteSlugs: ['notion', 'slack', 'miro'],
    introduction:
      '협업 도구를 늘렸는데 결정한 내용이 어디 있는지 찾기 어려워질 수 있어요. 작은 팀이라면 도구를 모두 도입하기 전에 대화할 곳, 최종 결정을 남길 곳, 회의 자료를 펼칠 곳을 정해 보세요. 한 도구로 충분하면 그대로 시작해도 좋아요. 이 글은 각 도구의 공식 기능 안내를 바탕으로 제안하는 운영 방식이에요.',
    comparison: [
      {
        need: '빠른 질문·주제별 대화',
        choice: '슬랙 채널',
        check: '채널 목적, 알림 규칙, 현재 플랜의 보관 범위',
      },
      {
        need: '업무 절차·회의록·결정 기록',
        choice: '노션 페이지',
        check: '읽기·편집 권한, 외부 게시 여부, 내보내기',
      },
      {
        need: '아이디어 수집·흐름도',
        choice: '미로 보드',
        check: '접근 가능한 사람, 회의 후 정리할 위치',
      },
    ],
    sections: [
      {
        title: '한 업무를 예로 들어 경로부터 정하세요',
        text: '예를 들어 행사 준비라면 질문은 행사 채널에서, 일정과 최종 결정은 행사 문서에서, 회의 아이디어는 행사 보드에서 다뤄 보세요. 세 곳 모두에 같은 내용을 복사하기보다 최종 문서 한 곳을 정하고 링크로 연결하세요. 도구 이름보다 최종본이 어디 있는지를 모두가 아는 것이 먼저예요.',
      },
      {
        title: '대화가 끝나면 결정만 따로 남기세요',
        text: '채팅에는 검토 중인 생각과 확정한 결정이 섞여요. 회의나 논의가 끝나면 결정 내용·담당자·다음 확인일을 짧게 정리해 최종 문서에 남겨 보세요. 새 팀원이 전체 채팅을 읽지 않아도 무엇을 해야 하는지 알 수 있는지가 기준이에요. Slack은 주제별 채널을 제공하지만 기록을 정리하는 규칙은 팀이 정해야 해요.',
      },
      {
        title: '초대와 공개 게시를 구분하세요',
        text: 'Notion에서 특정 사람을 초대하는 것과 웹에 페이지를 게시하는 것은 서로 다른 공유 방법이에요. Miro 역시 팀·공개 링크·개별 초대처럼 여러 접근 범위를 제공해요. 외부 협업자를 초대할 때는 필요한 문서만 보이는지 확인하고, 공유가 끝났을 때 권한을 다시 살펴보는 담당자를 정해 두세요.',
      },
      {
        title: '중요한 자료는 내보내기까지 확인하세요',
        text: '서비스를 옮기거나 팀원이 바뀔 때를 생각해 대표 문서 하나를 실제로 내보내 보세요. Notion은 PDF·HTML 등의 내보내기를 안내하지만 형식과 플랜에 따라 포함되는 내용이 달라질 수 있어요. 사본을 다시 열어 첨부 자료와 본문이 필요한 형태로 남는지 확인하면 도입 후의 재작업을 줄일 수 있어요.',
      },
    ],
    checklist: [
      '최종 결정 문서가 어디인지 팀원들이 알아요.',
      '대화 채널과 문서의 역할이 정해져 있어요.',
      '외부인·공개 링크의 접근 권한을 확인했어요.',
      '대표 자료의 내보내기 결과를 직접 열어 봤어요.',
    ],
  },
  {
    slug: 'first-github-project',
    title: 'GitHub에 첫 프로젝트를 올리기 전 준비할 것',
    summary:
      '계정 인증부터 공개 범위, README, 민감정보 확인까지 첫 공유에 필요한 순서를 정리했어요.',
    publishedAt,
    categorySlugs: ['dev', 'productivity'],
    siteSlugs: ['github', 'notion'],
    introduction:
      '프로젝트를 공유하려는데 어떤 파일을 올리고 어떤 설명을 써야 할지 막막할 수 있어요. 처음에는 작은 예제 하나를 다른 사람이 이해할 수 있게 정리하는 것을 목표로 해 보세요. 아래 순서는 계정 가입 절차에 더해 여기다가 제안하는 공개 전 준비 목록이에요. 실제로 이용해 본 후기나 채용 성과를 보장하는 안내는 아니에요.',
    comparison: [
      {
        need: '가입과 이메일 인증',
        choice: 'GitHub 공식 계정 안내',
        check: '인증 완료 여부와 계정 보안 설정',
      },
      {
        need: '프로젝트와 변경 내용 공유',
        choice: 'GitHub 저장소',
        check: '공개할 파일과 공개 범위',
      },
      {
        need: '긴 기획 메모·자료 정리',
        choice: '필요하면 별도 문서',
        check: '코드 설명과 중복되지 않는지, 접근 권한이 맞는지',
      },
    ],
    sections: [
      {
        title: '계정을 만든 다음 인증을 마치세요',
        text: 'GitHub 공식 안내는 개인 계정과 인증된 이메일 주소를 기본으로 안내해요. 이메일 인증을 마치지 않으면 저장소 생성 등 일부 작업이 제한될 수 있어요. 가입 화면만 닫지 말고 인증 상태를 확인하고, 계정 보호를 위한 2단계 인증 설정도 살펴보세요.',
      },
      {
        title: '공개 범위와 올릴 자료를 먼저 정하세요',
        text: '본인이 공개할 권한이 있는 코드와 자료만 골라 보세요. 회사나 수업에서 받은 자료는 공개 가능한지 먼저 확인하고, 비밀번호·인증키·고객정보·개인 문서가 섞이지 않았는지 확인하세요. 비공개 저장소를 선택했더라도 꼭 필요한 자료만 올리는 습관을 들이는 편이 좋아요.',
      },
      {
        title: 'README에는 사용자가 처음 묻는 것을 적으세요',
        text: '무엇을 하는 프로젝트인지, 실행 전에 무엇이 필요한지, 어떤 순서로 실행하는지 적어 보세요. 기능을 길게 나열하기보다 실제 실행 예시와 현재의 제한을 짧게 남기면 다른 사람이 따라 하기 쉬워요. 기획 메모를 별도 문서에 보관한다면 README에서 연결하되 같은 설명을 두 곳에서 따로 관리하지 않도록 해 주세요.',
      },
      {
        title: '다른 사람이 이해하는지 확인하고 공유하세요',
        text: '프로젝트를 모르는 사람의 입장에서 README를 읽고 필요한 파일과 설명이 있는지 확인해 보세요. 공개된 페이지가 보여도 앱이 실행되거나 웹에 배포되었다는 뜻은 아니에요. 저장·공유와 실제 배포를 구분하고, 나중에 수정할 내용을 작은 작업 목록으로 남겨 두면 다음 변경을 이어가기 쉬워요.',
      },
    ],
    checklist: [
      '이메일 인증과 계정 보안 설정을 확인했어요.',
      '공개할 권한과 민감정보 포함 여부를 확인했어요.',
      'README에 목적·준비물·실행 순서를 적었어요.',
      '프로젝트 공유와 실제 앱 배포를 구분했어요.',
    ],
  },
];

export function getDiscoverGuides() {
  return guides;
}
export function getDiscoverGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
export function getDiscoverGuidesForSite(slug: string) {
  return guides.filter((guide) => guide.siteSlugs.includes(slug));
}
export function getDiscoverGuidesForCategory(slug: string) {
  return guides.filter((guide) => guide.categorySlugs.includes(slug));
}
export function getDiscoverGuideSources(guide: DiscoverGuide) {
  return [
    ...new Map(
      guide.siteSlugs
        .flatMap((slug) => siteNotes[slug]?.sources ?? [])
        .map((source) => [source.url, source]),
    ).values(),
  ];
}
