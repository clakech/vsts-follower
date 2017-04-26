import { VstsProject, VstsProjectList } from './vsts-project';

describe('VstsProject', () => {
  it('should create an instance', () => {
    expect(new VstsProject()).toBeTruthy();
    expect(new VstsProjectList("")).toBeTruthy();
  });

  it('Should create list from json', () => {
    const json = "{\"count\":10,\"value\":[{\"id\":\"0859d3d5-3ac9-46d1-b1f6-b0e81b2e5ef6\",\"name\":\"NAE\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/0859d3d5-3ac9-46d1-b1f6-b0e81b2e5ef6\",\"state\":\"wellFormed\",\"revision\":2645467},{\"id\":\"427ca556-af6c-4756-8c23-6eaae4f77d09\",\"name\":\"AF.EAutoV2\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/427ca556-af6c-4756-8c23-6eaae4f77d09\",\"state\":\"wellFormed\",\"revision\":2645352},{\"id\":\"96bea5da-7e64-47a1-a65e-4db7bb40358b\",\"name\":\"AF.WSIARD\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/96bea5da-7e64-47a1-a65e-4db7bb40358b\",\"state\":\"wellFormed\",\"revision\":2645829},{\"id\":\"fabcb206-c2a9-44f0-93d6-90b94802cf26\",\"name\":\"DND\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/fabcb206-c2a9-44f0-93d6-90b94802cf26\",\"state\":\"wellFormed\",\"revision\":2645792},{\"id\":\"ccb10153-812a-4337-8e50-f80b8d3f5a3b\",\"name\":\"DevOps\",\"description\":\"Projet commun d'hébergement de l'outillage DevOps (scripts, templates...)\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/ccb10153-812a-4337-8e50-f80b8d3f5a3b\",\"state\":\"wellFormed\",\"revision\":2645380},{\"id\":\"87ef386b-b63f-4147-a2eb-fb582bce9adf\",\"name\":\"PEMA\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/87ef386b-b63f-4147-a2eb-fb582bce9adf\",\"state\":\"wellFormed\",\"revision\":2645886},{\"id\":\"a1f7ca85-3902-4d3f-bd0d-94128cf2b491\",\"name\":\"AF.OSE\",\"description\":\"Feature Team OSE \",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/a1f7ca85-3902-4d3f-bd0d-94128cf2b491\",\"state\":\"wellFormed\",\"revision\":2645350},{\"id\":\"2ef4d2a2-8151-425c-a47e-8a49d046f4d5\",\"name\":\"AF.AttestationsEntreprise\",\"description\":\"Attestations Entreprise\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/2ef4d2a2-8151-425c-a47e-8a49d046f4d5\",\"state\":\"wellFormed\",\"revision\":2645344},{\"id\":\"8c7469d0-f4e9-4f4e-ab75-51caef06b67d\",\"name\":\"ReUse\",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/8c7469d0-f4e9-4f4e-ab75-51caef06b67d\",\"state\":\"wellFormed\",\"revision\":2645843},{\"id\":\"8af4866b-8060-40e2-a2e6-64583a81fdfa\",\"name\":\"ASIV\",\"description\":\"Application interne de restitution des informations d’un véhicule en recherchant avec son immatriculation sur la base interne SIV d’AXA \",\"url\":\"https://axafrance.visualstudio.com/DefaultCollection/_apis/projects/8af4866b-8060-40e2-a2e6-64583a81fdfa\",\"state\":\"wellFormed\",\"revision\":2645900}]}";
    const projectList: VstsProjectList = new VstsProjectList(json);

    expect(projectList.count).toBe(10);

  });
});
