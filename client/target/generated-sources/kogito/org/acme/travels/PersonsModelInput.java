package org.acme.travels;

import java.util.Map;
import java.util.HashMap;

@org.kie.internal.kogito.codegen.Generated(value = "kogito-codegen", reference = "persons", name = "Persons", hidden = true)
public class PersonsModelInput implements org.kie.kogito.Model {

    @Override
    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap();
        params.put("person", this.person);
        return params;
    }

    @Override
    public void fromMap(Map<String, Object> params) {
        fromMap(null, params);
    }

    @Override
    public void update(Map<String, Object> params) {
        fromMap(params);
    }

    public void fromMap(String id, Map<String, Object> params) {
        this.person = (org.acme.travels.Person) params.get("person");
    }

    @org.kie.internal.kogito.codegen.VariableInfo(tags = "")
    @com.fasterxml.jackson.annotation.JsonProperty(value = "person")
    @javax.validation.Valid()
    private org.acme.travels.Person person;

    public org.acme.travels.Person getPerson() {
        return person;
    }

    public void setPerson(org.acme.travels.Person person) {
        this.person = person;
    }

    public PersonsModel toModel() {
        PersonsModel result = new PersonsModel();
        result.setPerson(getPerson());
        return result;
    }
}
