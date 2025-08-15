interface AuthorContent {
  content: ContentTemplate;
  info: AuthorInfo;
}

type AuthorContentCredits = Record<string, Record<string, AuthorContent[]>>;

export function getAuthorCredits(): AuthorContentCredits {
  const credits: AuthorContentCredits = {};

  function addToCredits<T extends ContentTemplate>(
    iter: { [k in string]?: T | undefined },
    name: string,
  ) {
    for (const [workkey, work] of objectEntries(iter)) {
      if (work) {
        const author = work.getAuthor();
        if (!author.name) continue;
        if (!(author.name in credits)) {
          credits[author.name] = {};
          for (const contentkey of setup.CONTENT_CREATOR_TYPES) {
            credits[author.name][contentkey] = [];
          }
        }
        credits[author.name][name].push({ content: work, info: author });
      }
    }

    // sort it
    for (const author in credits) {
      credits[author][name].sort((a, b) =>
        a.content.getName().localeCompare(b.content.getName()),
      );
    }
  }

  addToCredits(setup.questtemplate, "quest");
  addToCredits(setup.opportunitytemplate, "opportunity");
  addToCredits(setup.event, "event");
  addToCredits(setup.interaction, "interaction");
  addToCredits(setup.activitytemplate, "activity");
  return credits;
}
