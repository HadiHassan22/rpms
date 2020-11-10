package org.acme.travels;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.ws.rs.Consumes;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;
import org.kie.api.runtime.process.WorkItemNotFoundException;
import org.jbpm.util.JsonSchemaUtil;
import org.kie.kogito.Application;
import org.kie.kogito.process.Process;
import org.kie.kogito.process.ProcessInstance;
import org.kie.kogito.process.ProcessInstanceExecutionException;
import org.kie.kogito.process.ProcessInstanceNotFoundException;
import org.kie.kogito.process.ProcessInstanceReadMode;
import org.kie.kogito.process.WorkItem;
import org.kie.kogito.process.workitem.Policies;
import org.kie.kogito.process.impl.Sig;
import org.kie.kogito.services.uow.UnitOfWorkExecutor;
import org.kie.kogito.auth.IdentityProvider;
import org.jbpm.process.instance.impl.humantask.HumanTaskTransition;
import org.acme.travels.PersonsModelOutput;

@Path("/persons")
@org.springframework.stereotype.Component()
public class PersonsResource {

    @org.springframework.beans.factory.annotation.Autowired()
    @org.springframework.beans.factory.annotation.Qualifier("persons")
    Process<PersonsModel> process;

    @org.springframework.beans.factory.annotation.Autowired()
    Application application;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createResource_persons(@Context HttpHeaders httpHeaders, @Context UriInfo uriInfo, @QueryParam("businessKey") String businessKey, @javax.validation.Valid() @javax.validation.constraints.NotNull() PersonsModelInput resource) {
        return UnitOfWorkExecutor.executeInUnitOfWork(application.unitOfWorkManager(), () -> {
            PersonsModelInput inputModel = resource != null ? resource : new PersonsModelInput();
            ProcessInstance<PersonsModel> pi = process.createInstance(businessKey, inputModel.toModel());
            String startFromNode = httpHeaders.getHeaderString("X-KOGITO-StartFromNode");
            if (startFromNode != null) {
                pi.startFrom(startFromNode);
            } else {
                pi.start();
            }
            UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder().path(pi.id());
            return Response.created(uriBuilder.build()).entity(pi.checkError().variables().toOutput()).build();
        });
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<PersonsModelOutput> getResources_persons() {
        return process.instances().values().stream().map(pi -> pi.variables().toOutput()).collect(Collectors.toList());
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public PersonsModelOutput getResource_persons(@PathParam("id") String id) {
        return process.instances().findById(id, ProcessInstanceReadMode.READ_ONLY).map(pi -> pi.variables().toOutput()).orElseThrow(() -> new NotFoundException());
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public PersonsModelOutput deleteResource_persons(@PathParam("id") final String id) {
        return UnitOfWorkExecutor.executeInUnitOfWork(application.unitOfWorkManager(), () -> process.instances().findById(id).map(pi -> {
            pi.abort();
            return pi.checkError().variables().toOutput();
        }).orElseThrow(() -> new NotFoundException()));
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PersonsModelOutput updateModel_persons(@PathParam("id") String id, PersonsModel resource) {
        return UnitOfWorkExecutor.executeInUnitOfWork(application.unitOfWorkManager(), () -> process.instances().findById(id).map(pi -> pi.updateVariables(resource).toOutput()).orElseThrow(() -> new NotFoundException()));
    }

    @GET
    @Path("/{id}/tasks")
    @Produces(MediaType.APPLICATION_JSON)
    public List<WorkItem> getTasks_persons(@PathParam("id") String id, @QueryParam("user") final String user, @QueryParam("group") final List<String> groups) {
        return process.instances().findById(id, ProcessInstanceReadMode.READ_ONLY).map(pi -> pi.workItems(Policies.of(user, groups))).orElseThrow(() -> new NotFoundException());
    }

    @POST
    @Path("/{id}/ChildrenHandling/{workItemId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public PersonsModelOutput completeTask_ChildrenHandling_0(@PathParam("id") final String id, @PathParam("workItemId") final String workItemId, @QueryParam("phase") @DefaultValue("complete") final String phase, @QueryParam("user") final String user, @QueryParam("group") final List<String> groups, final Persons_5_TaskOutput model) {
        return UnitOfWorkExecutor.executeInUnitOfWork(application.unitOfWorkManager(), () -> process.instances().findById(id).map(pi -> {
            pi.transitionWorkItem(workItemId, HumanTaskTransition.withModel(phase, model, Policies.of(user, groups)));
            return pi.variables().toOutput();
        }).orElseThrow(() -> new NotFoundException()));
    }

    @GET
    @Path("/{id}/ChildrenHandling/{workItemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Persons_5_TaskInput getTask_ChildrenHandling_0(@PathParam("id") String id, @PathParam("workItemId") String workItemId, @QueryParam("user") final String user, @QueryParam("group") final List<String> groups) {
        return process.instances().findById(id, ProcessInstanceReadMode.READ_ONLY).map(pi -> Persons_5_TaskInput.from(pi.workItem(workItemId, Policies.of(user, groups)))).orElseThrow(() -> new NotFoundException());
    }

    @GET
    @Path("ChildrenHandling/schema")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> getSchema_ChildrenHandling_0() {
        return JsonSchemaUtil.load(this.getClass().getClassLoader(), process.id(), "ChildrenHandling");
    }

    @GET
    @Path("/{id}/ChildrenHandling/{workItemId}/schema")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> getSchemaAndPhases_ChildrenHandling_0(@PathParam("id") final String id, @PathParam("workItemId") final String workItemId, @QueryParam("user") final String user, @QueryParam("group") final List<String> groups) {
        return JsonSchemaUtil.addPhases(process, application, id, workItemId, Policies.of(user, groups), JsonSchemaUtil.load(this.getClass().getClassLoader(), process.id(), "ChildrenHandling"));
    }

    @DELETE
    @Path("/{id}/ChildrenHandling/{workItemId}")
    @Produces(MediaType.APPLICATION_JSON)
    public PersonsModelOutput abortTask_ChildrenHandling_0(@PathParam("id") final String id, @PathParam("workItemId") final String workItemId, @QueryParam("phase") @DefaultValue("abort") final String phase, @QueryParam("user") final String user, @QueryParam("group") final List<String> groups) {
        return UnitOfWorkExecutor.executeInUnitOfWork(application.unitOfWorkManager(), () -> process.instances().findById(id).map(pi -> {
            pi.transitionWorkItem(workItemId, HumanTaskTransition.withoutModel(phase, Policies.of(user, groups)));
            return pi.variables().toOutput();
        }).orElseThrow(() -> new NotFoundException()));
    }
}
