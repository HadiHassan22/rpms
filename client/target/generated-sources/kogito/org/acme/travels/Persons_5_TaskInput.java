package org.acme.travels;

import java.util.Map;
import org.kie.kogito.UserTask;
import org.kie.kogito.UserTaskParam.ParamType;
import org.kie.kogito.UserTaskParam;

@UserTask(taskName = "ChildrenHandling", processName = "persons")
public class Persons_5_TaskInput {

    private String _id;

    private String _name;

    public void setId(String id) {
        this._id = id;
    }

    public String getId() {
        return this._id;
    }

    public void setName(String name) {
        this._name = name;
    }

    public String getName() {
        return this._name;
    }

    public static Persons_5_TaskInput from(org.kie.kogito.process.WorkItem workItem) {
        Persons_5_TaskInput item = new Persons_5_TaskInput();
        item._id = workItem.getId();
        item._name = workItem.getName();
        Map<String, Object> params = workItem.getParameters();
        item.person = (org.acme.travels.Person) params.get("person");
        return item;
    }

    @UserTaskParam(value = ParamType.INPUT)
    private org.acme.travels.Person person;

    public org.acme.travels.Person getPerson() {
        return person;
    }

    public void setPerson(org.acme.travels.Person person) {
        this.person = person;
    }
}
// Task input model for user task 'Special handling for children' in process 'persons'
