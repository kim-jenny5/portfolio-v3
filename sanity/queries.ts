import { groq } from 'next-sanity';

// Homepage — card fields only, no project page data
export const homePageQuery = groq`
    *[_type == "homePage"][0] {
      hero { headline, subline },
      selectedProjects {
        sectionTitle,
        projects[]-> {
          _id,
          title,
          description,
          tags,
          coverImage
        }
      }
    }
  `;

// Full project page — used later when building /work/[slug]
export const projectPageQuery = groq`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      tags,
      coverImage,
      projectNumber,
      category,
      subtitle,
      heroImage,
      overview { timeline, tools, deliverables, links },
      sections[] { title, body }
    }
  `;

export const projectSlugQuery = groq`
    *[_type == "project" && defined(slug.current)] {
      "slug": slug.current
    }
  `;
