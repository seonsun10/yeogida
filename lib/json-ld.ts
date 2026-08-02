/**
 * JSON-LD를 <script> 태그에 안전하게 주입하기 위한 props를 만든다.
 * `<` 문자를 유니코드로 치환해 XSS 삽입을 방지한다 (Next.js 공식 가이드 권장 방식).
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    },
  } as const;
}

export function breadcrumbList(
  items: { name: string; url: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
