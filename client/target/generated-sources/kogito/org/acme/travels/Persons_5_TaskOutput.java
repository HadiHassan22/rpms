package org.acme.travels;

import java.util.Map;
import java.util.HashMap;
import org.kie.kogito.UserTask;

@UserTask(taskName = "ChildrenHandling", processName = "persons")
public class Persons_5_TaskOutput implements org.kie.kogito.MapOutput {

    public Map<String, Object> toMap() {
        Map<String, Object> params = new HashMap();
        return params;
    }
}
// Task output model for user task 'Special handling for children' in process 'persons'
